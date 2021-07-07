import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchDocumentAuthorComponent } from './research-document-author.component';

describe('ResearchDocumentAuthorComponent', () => {
  let component: ResearchDocumentAuthorComponent;
  let fixture: ComponentFixture<ResearchDocumentAuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchDocumentAuthorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchDocumentAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
