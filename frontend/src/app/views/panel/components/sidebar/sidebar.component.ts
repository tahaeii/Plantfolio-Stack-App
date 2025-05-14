import { Router } from '@angular/router';         
import { MatSidenav } from '@angular/material/sidenav';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  sidenavMode: 'side' | 'over' = 'side';
  sidenavOpened: boolean = true; // Develope Chnages
  isBagher!: boolean;

  activeComponent !: 'sidenav' | 'stepper';

  constructor(
    public userSrvc: AuthService, private fb: FormBuilder,
    private router: Router, private renderer: Renderer2) { }


  passwordForm !: FormGroup;


  isFormSaved: boolean | null = null; // Initially set to null
  isStatusLoaded: boolean = false; // Flag to track when the form status is loaded

  userfname: string = 'طه عارف'; // Default User Name
  userrank: string = 'توسعه دهنده'; // Default User Email
  rank: string | null = null;
  @ViewChild('messageTab', { static: false }) messageTab!: ElementRef;

  ngOnInit() {  }

  tabs: { label: string; component: string }[] = [];

  mainTabs = [
    { label: 'Products', component: 'products', icon: 'fa-spa' },
    { label: 'Orders', component: 'orders', icon: 'fa-receipt' },
    { label: 'Payments', component: 'payments', icon: 'fa-credit-card' },
    { label: 'Backup', component: 'backup', icon: 'fa-cloud-arrow-down' },
  ];
  
  personalTabs = [
    { label: 'Customer Info', component: 'customers', icon: 'fa-address-book' },
    { label: 'Inventory', component: 'inventory', icon: 'fa-warehouse' },
    { label: 'Favorite Category', component: 'favorite-category', icon: 'fa-heart' },
  ];
  

  
}

