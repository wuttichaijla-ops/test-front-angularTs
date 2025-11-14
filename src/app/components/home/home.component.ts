import { Component, OnInit } from '@angular/core';
import { DataService, Comment } from '../../services/data.service';

interface Item {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: Item[] = [];
  newItemName: string = '';
  newItemDescription: string = '';
  isLoading: boolean = false;
  
  comments: Comment[] = [
    { id: 1, author: 'Blend 285', text: 'have a good day', avatar: 'B' }
  ];
  newCommentText: string = '';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.isLoading = true;
    this.dataService.getItems().subscribe({
      next: (items) => {
        this.items = items;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading items:', error);
        this.isLoading = false;
      }
    });
  }

  addItem(): void {
    if (this.newItemName.trim() && this.newItemDescription.trim()) {
      const newItem: Item = {
        id: Date.now(),
        name: this.newItemName,
        description: this.newItemDescription
      };
      
      this.dataService.addItem(newItem).subscribe({
        next: (item) => {
          this.items.push(item);
          this.newItemName = '';
          this.newItemDescription = '';
        },
        error: (error) => {
          console.error('Error adding item:', error);
        }
      });
    }
  }

  deleteItem(id: number): void {
    this.dataService.deleteItem(id).subscribe({
      next: () => {
        this.items = this.items.filter(item => item.id !== id);
      },
      error: (error) => {
        console.error('Error deleting item:', error);
      }
    });
  }

  addComment(): void {
    if (this.newCommentText.trim()) {
      const newComment: Comment = {
        id: Date.now(),
        author: 'Blend 285',
        text: this.newCommentText.trim(),
        avatar: 'B'
      };
      
      this.dataService.addComment(newComment).subscribe({
        next: (comment) => {
          this.comments.push(comment);
          this.newCommentText = '';
        },
        error: (error) => {
          console.error('Error adding comment:', error);
          // Optionally show error message to user
        }
      });
    }
  }
}

