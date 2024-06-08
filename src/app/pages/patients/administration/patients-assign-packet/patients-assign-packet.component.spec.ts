import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsAssignPacketComponent } from './patients-assign-packet.component';

describe('PatientsAssignPacketComponent', () => {
  let component: PatientsAssignPacketComponent;
  let fixture: ComponentFixture<PatientsAssignPacketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientsAssignPacketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientsAssignPacketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
