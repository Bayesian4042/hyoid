// src/connections/connections.service.ts
import { Injectable } from '@nestjs/common';
import { WebSocket } from 'ws';

interface ConnectionDetails {
  ws: WebSocket;
  chatHistory: any[];
  currentAudioTimer: NodeJS.Timeout | null;
}

@Injectable()
export class ConnectionsService {
  private connections: Map<string, ConnectionDetails> = new Map();

  addConnection(streamSid: string, details: ConnectionDetails) {
    this.connections.set(streamSid, details);
  }

  getConnection(streamSid: string): ConnectionDetails | undefined {
    return this.connections.get(streamSid);
  }

  removeConnection(streamSid: string) {
    this.connections.delete(streamSid);
  }

  getAllConnections(): Map<string, ConnectionDetails> {
    return this.connections;
  }
}
