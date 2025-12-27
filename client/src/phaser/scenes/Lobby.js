import Phaser from "phaser";
import socket from "../network/socket";

export default class Lobby extends Phaser.Scene {
  constructor() {
    super("Lobby");
  }

  create() {
    const { width, height } = this.scale;

    // Background
    this.add.rectangle(0, 0, width, height, 0x2c3e50).setOrigin(0);

    // Title
    this.add.text(width / 2, 80, 'MULTIPLAYER GAME', {
      fontSize: '48px',
      fontFamily: 'Arial',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Subtitle
    this.add.text(width / 2, 140, 'Create or Join a Room', {
      fontSize: '24px',
      fontFamily: 'Arial',
      color: '#ecf0f1'
    }).setOrigin(0.5);

    // Room ID Input Box Background
    const inputBox = this.add.rectangle(width / 2, 220, 400, 60, 0x34495e);
    inputBox.setStrokeStyle(3, 0x3498db);

    // Room ID Text (shows what user types)
    this.roomIdText = this.add.text(width / 2, 220, '', {
      fontSize: '32px',
      fontFamily: 'Arial',
      color: '#ffffff'
    }).setOrigin(0.5);

    // Placeholder text
    this.placeholderText = this.add.text(width / 2, 220, 'Enter Room ID...', {
      fontSize: '28px',
      fontFamily: 'Arial',
      color: '#7f8c8d'
    }).setOrigin(0.5);

    // Room ID storage
    this.currentRoomId = '';

    // Click on input box to focus
    inputBox.setInteractive({ useHandCursor: true });
    inputBox.on('pointerdown', () => {
      this.focusInput();
    });

    // Create Room Button
    const createButton = this.add.rectangle(width / 2 - 110, 320, 200, 60, 0xe67e22)
      .setInteractive({ useHandCursor: true });

    this.add.text(width / 2 - 110, 320, 'CREATE ROOM', {
      fontSize: '22px',
      fontFamily: 'Arial',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Join Room Button
    const joinButton = this.add.rectangle(width / 2 + 110, 320, 200, 60, 0x27ae60)
      .setInteractive({ useHandCursor: true });

    this.add.text(width / 2 + 110, 320, 'JOIN ROOM', {
      fontSize: '22px',
      fontFamily: 'Arial',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Button hover effects
    createButton.on('pointerover', () => createButton.setFillStyle(0xf39c12));
    createButton.on('pointerout', () => createButton.setFillStyle(0xe67e22));
    
    joinButton.on('pointerover', () => joinButton.setFillStyle(0x2ecc71));
    joinButton.on('pointerout', () => joinButton.setFillStyle(0x27ae60));

    // Button clicks
    createButton.on('pointerdown', () => {
      this.createRoom();
    });

    joinButton.on('pointerdown', () => {
      this.joinRoom();
    });

    // Status message
    this.statusText = this.add.text(width / 2, 420, '', {
      fontSize: '20px',
      fontFamily: 'Arial',
      color: '#e74c3c'
    }).setOrigin(0.5);

    // Instructions
    this.add.text(width / 2, 500, 'How to Play:', {
      fontSize: '22px',
      fontFamily: 'Arial',
      color: '#ecf0f1',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(width / 2, 540, '• CREATE ROOM: Generates a unique room for you', {
      fontSize: '18px',
      fontFamily: 'Arial',
      color: '#bdc3c7'
    }).setOrigin(0.5);

    this.add.text(width / 2, 570, '• JOIN ROOM: Enter room ID to play with friends', {
      fontSize: '18px',
      fontFamily: 'Arial',
      color: '#bdc3c7'
    }).setOrigin(0.5);

    this.add.text(width / 2, 600, '• Share your Room ID with friends to play together!', {
      fontSize: '18px',
      fontFamily: 'Arial',
      color: '#bdc3c7'
    }).setOrigin(0.5);

    // Keyboard input
    this.input.keyboard.on('keydown', (event) => {
      if (event.key === 'Enter') {
        this.joinRoom();
      } else if (event.key === 'Backspace') {
        this.currentRoomId = this.currentRoomId.slice(0, -1);
        this.updateRoomIdDisplay();
      } else if (event.key.length === 1 && this.currentRoomId.length < 20) {
        // Only allow alphanumeric
        if (/^[a-zA-Z0-9]$/.test(event.key)) {
          this.currentRoomId += event.key;
          this.updateRoomIdDisplay();
        }
      }
    });

    // Socket event - room created successfully
    socket.on('roomCreated', (data) => {
      console.log('Room created:', data.roomId);
      this.showStatus(`Room Created: ${data.roomId}`, '#27ae60');
      this.currentRoomId = data.roomId;
      this.updateRoomIdDisplay();
      
      // Start game after short delay
      this.time.delayedCall(1500, () => {
        this.scene.start('Game', { roomId: data.roomId });
      });
    });

    // Socket event - joined room successfully
    socket.on('roomJoined', (data) => {
      console.log('Joined room:', data.roomId);
      this.showStatus('Joining room...', '#27ae60');
      
      // Start game
      this.time.delayedCall(500, () => {
        this.scene.start('Game', { roomId: data.roomId });
      });
    });

    // Socket event - room not found
    socket.on('roomNotFound', () => {
      this.showStatus('Room not found! Check the Room ID.', '#e74c3c');
    });

    // Socket event - room is full
    socket.on('roomFull', () => {
      this.showStatus('Room is full! Try another room.', '#e74c3c');
    });
  }

  focusInput() {
    // Visual feedback that input is focused
    this.placeholderText.setAlpha(0.5);
  }

  updateRoomIdDisplay() {
    if (this.currentRoomId.length > 0) {
      this.roomIdText.setText(this.currentRoomId);
      this.placeholderText.setVisible(false);
    } else {
      this.roomIdText.setText('');
      this.placeholderText.setVisible(true);
    }
  }

  createRoom() {
    // Generate random room ID
    const randomId = this.generateRoomId();
    
    this.showStatus('Creating room...', '#f39c12');
    
    // Tell server to create room
    socket.emit('createRoom', { roomId: randomId });
  }

  joinRoom() {
    if (this.currentRoomId.length < 3) {
      this.showStatus('Room ID must be at least 3 characters!', '#e74c3c');
      return;
    }

    this.showStatus('Joining room...', '#3498db');
    
    // Tell server to join room
    socket.emit('joinRoom', { roomId: this.currentRoomId });
  }

  generateRoomId() {
    // Generate 6-character random room ID
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  showStatus(message, color) {
    this.statusText.setText(message);
    this.statusText.setColor(color);
  }
}