import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasteListComponent } from './waste-list.component';

describe('WasteListComponent', () => {
  let component: WasteListComponent;
  let fixture: ComponentFixture<WasteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WasteListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WasteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
