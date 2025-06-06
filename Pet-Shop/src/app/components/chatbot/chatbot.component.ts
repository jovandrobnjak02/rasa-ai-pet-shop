import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  from: 'user' | 'bot';
  text: string;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  open = false;
  input = '';
  messages: Message[] = [];

  private rasaUrl = 'http://localhost:5005/webhooks/rest/webhook';

  constructor(private http: HttpClient) {}

  toggle(): void {
    this.open = !this.open;
    if (this.open && this.messages.length === 0) {
      this.addBotMessage('Hello! I am Rasa AI. How can I help you?');
    }
  }

  send(): void {
    const text = this.input.trim();
    if (!text) {
      return;
    }
    this.addUserMessage(text);
    this.input = '';

    this.http.post<any[]>(this.rasaUrl, {
      sender: 'user1',
      message: text
    }).subscribe(
      responses => {
        for (const r of responses) {
          if (r.text) {
            this.addBotMessage(r.text);
          }
        }
      },
      err => {
        console.error('Error connecting to Rasa server', err);
        this.addBotMessage('Sorry, I am unable to connect to the server right now.');
      }
    );
  }

  private addUserMessage(text: string): void {
    this.messages.push({ from: 'user', text });
    setTimeout(() => this.scrollToBottom(), 50);
  }

  private addBotMessage(text: string): void {
    this.messages.push({ from: 'bot', text });
    setTimeout(() => this.scrollToBottom(), 50);
  }

  private scrollToBottom(): void {
    const container = document.querySelector('.messages-container');
    if (container) {
      setTimeout(() => {
        container.scrollTop = container.scrollHeight;
      }, 50);
    }
  }
} 