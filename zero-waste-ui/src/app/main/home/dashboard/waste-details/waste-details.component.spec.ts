import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasteDetailsComponent } from './waste-details.component';

describe('WasteDetailsComponent', () => {
  let component: WasteDetailsComponent;
  let fixture: ComponentFixture<WasteDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WasteDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WasteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
