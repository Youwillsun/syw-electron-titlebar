import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SywElectronTitlebarComponent } from './syw-electron-titlebar.component';

describe('ElectronTitlebarComponent', () => {
  let component: SywElectronTitlebarComponent;
  let fixture: ComponentFixture<SywElectronTitlebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SywElectronTitlebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SywElectronTitlebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
