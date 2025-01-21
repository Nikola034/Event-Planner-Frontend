import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryDto } from '../model/category.dto';
import { ButtonModule } from 'primeng/button';
import { CategoryService } from '../category.service';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-replace-category',
  standalone: true,
  imports: [ButtonModule, DropdownModule],
  templateUrl: './replace-category.component.html',
  styleUrl: './replace-category.component.scss'
})
export class ReplaceCategoryComponent implements OnInit {
  @Input() categoryData!: CategoryDto;
  @Output() categoryReplaced = new EventEmitter<boolean>;
  allCategories: CategoryDto[] = [];
  categoryId: number = -1;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
      this.categoryService.getAllApproved().subscribe({
        next: (response) => {
          this.allCategories = response;
        }
      });
  }

  onCategoryChange(event: any) {
    const selectedCategoryId = event.value?.id;
    this.categoryId = selectedCategoryId;
  }

  isValid() {
    if(this.categoryId === -1) {
      return false;
    }
    return true;
  }

  onSubmit() {
    if(this.isValid()) {
      this.categoryService.replace(this.categoryId, this.categoryData.id).subscribe({
        next: (response) => {
          this.categoryReplaced.emit(true);
        },
        error: (err) => {
          this.categoryReplaced.emit(false);
        }
      });
    }
  }
}
