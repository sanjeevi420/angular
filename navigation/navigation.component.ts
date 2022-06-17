import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardServiceService } from '../service/dashboard-service.service';

export interface element {
  name: string;
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  displayedColumnsBench: string[] = ['supp_name', 'supp_id', 'ltc_parts'];
  displayedColumnsAlert: string[]=['name'];
  dataSourceBench = new MatTableDataSource;
  alertData = new MatTableDataSource;
  color = '#17D2F7';
  dataSource:any;
  i:any;
 
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSourceBench.paginator = this.paginator;
    this.dataSourceBench.sort = this.sort;
  }

  constructor(private http: HttpClient, private dashboardservice: DashboardServiceService) { }

  ngOnInit(): void {
    this.http.get("../../assets/notification.json").subscribe((response)=>
    {
      this.dataSource = response;
      this.i=this.dataSource.length;
    });
    this.benchData()
    this.getAlertData();
  }

benchrowData:any='';
benchData(){
    this.dashboardservice.getBenchData().subscribe( (data: any)=>{
    console.log(data);
    this.benchrowData=data;
    this.dataSourceBench= new MatTableDataSource(this.benchrowData);
    this.dataSourceBench.sort=this.sort;
  })
  
}
  getAlertData(){
    this.dashboardservice.getAlertData().subscribe( (data: any)=>{
    console.log(data);
    this.alertData= data
    
  })
}

}