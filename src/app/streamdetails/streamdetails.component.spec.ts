import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamdetailsComponent } from './streamdetails.component';

describe('StreamdetailsComponent', () => {
  let component: StreamdetailsComponent;
  let fixture: ComponentFixture<StreamdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StreamdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StreamdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
