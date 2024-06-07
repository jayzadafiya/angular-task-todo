import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TastAddComponent } from './tast-add.component';

describe('TastAddComponent', () => {
  let component: TastAddComponent;
  let fixture: ComponentFixture<TastAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TastAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TastAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
