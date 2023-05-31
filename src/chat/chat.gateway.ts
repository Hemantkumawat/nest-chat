import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { InjectModel } from '@nestjs/mongoose';
  import { Mixed, Model } from 'mongoose';
  import { Message, MessageDocument } from './schemas/message.schema';
  

  @WebSocketGateway()
  export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
  
    constructor(
      @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    ) {}
  
    async handleConnection(client: Socket) {
      console.log(`Client connected: ${client.id}`);
    }
  
    async handleDisconnect(client: Socket) {
      console.log(`Client disconnected: ${client.id}`);
    }
  
    @SubscribeMessage('chat')
    async handleChatEvent(@MessageBody() data: any) {
        console.log("data",data);
      const message = new this.messageModel({ content: data.content,sender: data.sender });
      await message.save();
      console.log("data:::",data);
      this.server.emit('chat', message);
    }
  }
  