import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchDocumentFormComponent } from './research-document-form.component';

describe('ResearchDocumentFormComponent', () => {
  let component: ResearchDocumentFormComponent;
  let fixture: ComponentFixture<ResearchDocumentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchDocumentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchDocumentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
