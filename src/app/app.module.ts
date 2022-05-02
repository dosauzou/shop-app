import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { StockManagerComponent } from './components/stock-manager/stock-manager.component';
import { CustomerManagerComponent } from './components/customer-manager/customer-manager.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManagementToolsComponent } from './components/management-tools/management-tools.component';
import {MatTabsModule} from '@angular/material/tabs';
import { CustomerPanelComponent } from './components/customer-panel/customer-panel.component';
import { CartComponent } from './components/cart/cart.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { UserHeaderComponent } from './components/user-header/user-header.component';
import {MatCardModule} from '@angular/material/card';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import {MatIconModule} from '@angular/material/icon';
import { AdminStockComponent } from './components/admin-stock/admin-stock.component';
// import { AdminStockComponent } from './components/admin-stock/admin-stock.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AdminPanelComponent,
    StockManagerComponent,
    CustomerManagerComponent,
    ManagementToolsComponent,
    CustomerPanelComponent,
    CartComponent,
    AdminHeaderComponent,
    UserHeaderComponent,
    CustomerDetailsComponent,
    AdminStockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,   
    FormsModule,    //added here too
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTabsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule,
    ScrollingModule,
    MatIconModule

    


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
