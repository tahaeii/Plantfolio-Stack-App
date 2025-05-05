import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * CustomInputComponent
 * A reusable input component that supports text input and dropdown selection.
 * Implements ControlValueAccessor to integrate with Angular forms.
 */
@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    }
  ]
})
export class CustomInputComponent implements ControlValueAccessor {
  /** Label for the input field */
  @Input() label!: string;

  /** Placeholder text for the input field */
  @Input() placeholder: string = '';

  /** Input type: 'text' for text input, 'dropdown' for select input */
  @Input() type: 'text' | 'email' | 'number' | 'password' | 'textarea' | 'date' | 'dropdown' | 'editor' | 'image' = 'text';

  /** List of options (used for dropdown type) */
  @Input() options: string[] = [];

  /** Optional icon to display inside the input */
  @Input() icon?: string;

  /** Unique identifier for the input field */
  @Input() inputId: string = `custom-input-${Math.random().toString(36).substr(2, 9)}`;

  /** Input property to specify the text direction for the input field */
  @Input() direction: 'ltr' | 'rtl' | 'auto' = 'auto';

  /** Controls The Height Of The Textarea. It Can Be A Fixed Value (e.g., '150px') Or 'auto' For Dynamic Adjustment. */
  @Input() height: string = 'auto';

  /** Defines The Minimum Height Of The Textarea When 'auto' Mode Is Enabled. Default Is '100px'. */
  @Input() minHeight: string = '100px';

  /** Quill editor toolbar configuration. */
  editorModules: { toolbar: any[] } & Record<string, any> = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'align': ['', 'center', 'right', 'justify'] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],
      ['clean']
    ],
    direction: 'rtl'
  };

  /** References The Textarea Element For Direct Manipulation. */
  @ViewChild('textareaRef') textareaRef!: ElementRef<HTMLTextAreaElement>;

  /** File input reference */
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  /** Emits the selected file to parent component */
  @Output() fileChange = new EventEmitter<File>();

  /** Stores the file change event */
  imageChangedEvent: any = null;

  /** Stores the cropped image in Base64 format */
  croppedImage: string = '';

  /** Controls the visibility of the cropping modal */
  showModal: boolean = false;

  /** Current value of the input */
  value: any = '';

  /** Function to propagate value changes */
  onChange = (_: any) => { };

  /** Function to mark input as touched */
  onTouched = () => { };

  /**
   * Writes A New Value To The Input Field And Adjusts Its Height.
   * @param value The New Value To Be Set In The Input Field.
   */
  writeValue(value: any): void {
    this.value = value;
    this.adjustHeight();
  }

  /**
   * Registers a callback function that should be called when the value changes.
   * @param fn - The function to be called on value change
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Registers a callback function that should be called when the input is touched.
   * @param fn - The function to be called on blur event
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Updates the value of the input field and triggers change detection.
   *
   * @param {any} event - The event triggered by user input. Can be a direct value (for editor),
   *                      an event object from input/select, or a date event from mat-datepicker.
   */
  updateValue(event: any) {
    if (this.type === 'editor') {
      // Directly assign the value for Quill editor
      this.value = event;
    } else if (this.type === 'date') {
      // Assign the selected date value from Angular Material datepicker
      this.value = event.value;
    } else {
      // Handle regular inputs, dropdowns, and textareas
      this.value = event.target ? event.target.value : event;
    }

    // Notify Angular's form control about the change
    this.onChange(this.value);

    // Auto-detect text direction (RTL/LTR) if enabled
    if (this.direction === 'auto') {
      this.detectDirection(this.value);
    }
  }


  /**
   * Detects the direction of the input value based on whether it is Latin or non-Latin.
   * Sets the direction to 'ltr' for Latin characters and 'rtl' for non-Latin characters.
   * 
   * @param value - The input value that needs to be checked for direction.
   */
  detectDirection(value: string) {
    const isLatin = /^[A-Za-z0-9@._-]+$/.test(value);
    this.direction = isLatin ? 'ltr' : 'rtl';
  }

  /**
 * Adjusts The Height Of The Textarea Dynamically When 'auto' Mode Is Enabled.
 * It Ensures The Textarea Expands Based On Its Content While Maintaining A Minimum Height.
 */
  private adjustHeight(): void {
    if (this.type === 'textarea' && this.height === 'auto' && this.textareaRef) {
      const textarea = this.textareaRef.nativeElement;
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.max(textarea.scrollHeight, parseInt(this.minHeight))}px`;
    }
  }

  /**
     * Triggers the file input click event
     */
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  /**
   * Handles the file selection event
   * @param event - The file input change event
   */
  fileChangeEvent(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.imageChangedEvent = null;
      this.showModal = false;

      // Delay to allow modal and cropper to reset
      setTimeout(() => {
        this.imageChangedEvent = event;
        this.showModal = true;
      }, 100);
    }
  }

  /**
   * Handles the image cropping event and updates the cropped image
   * @param event - The cropping event containing the cropped image in Base64 format
   */
  imageCropped(event: any): void {
    this.croppedImage = event.base64;
    this.onChange(this.croppedImage);
  }

  /**
   * Emits the selected file to the parent component
   * @param event - The file input change event
   */
  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.fileChange.emit(inputElement.files[0]);
    }
  }

  /**
   * Closes the cropping modal
   */
  closeModal(): void {
    this.showModal = false;
  }

  /**
   * Resets the cropper and clears the cropped image
   */
  resetCropper(): void {
    this.imageChangedEvent = null;
    this.croppedImage = '';
  }


  showPassword: boolean = false;

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}