import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OverlayPanel } from 'primeng/overlaypanel';
import { ResearchDocumentAuthorModel } from '../models/research.document.author.model';
import { ResearchDocumentViewModel } from '../models/research.document.view.model';
import { SearchModel } from '../models/search.model';
import { ResearchService } from '../research.service';


@Component({
  selector: 'app-research-view',
  templateUrl: './research-view.component.html',
  styleUrls: ['./research-view.component.scss']
})
export class ResearchViewComponent implements OnInit {

  researchDocuments: ResearchDocumentViewModel[] = [];
  researchAuthors: ResearchDocumentAuthorModel[] = [];
  searchForm: FormGroup;
  config: any;
  constructor(private researchService: ResearchService) {

    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.researchDocuments.length
    };
   }

  ngOnInit() {
    this.researchService.getAllResearchDocuments().subscribe(res => {
       this.researchDocuments = res as ResearchDocumentViewModel[];
    });

    this.searchForm = new FormGroup({
      title: new  FormControl(''),
      edition: new FormControl(''),
      year: new FormControl('')
    });
  }

  displayAuthors(event: any, doc: ResearchDocumentViewModel, overlaypanel: OverlayPanel) {
    console.log(overlaypanel);
    this.researchService.getResearchDocumentAuthors(doc.documentId).subscribe(res => {
        this.researchAuthors = res as ResearchDocumentAuthorModel[];
        overlaypanel.toggle(event);
    });
  }

  downloadFile(data: ResearchDocumentViewModel) {
    this.researchService.downloadFile(data.documentId);
  }

  searchDocuments({ value, valid }: { value: SearchModel; valid: boolean }) {
    this.researchService.findResearchDocuments(value).subscribe(res => {
       this.researchDocuments = res as ResearchDocumentViewModel[];
    });
 }


pageChanged(event) {
  this.config.currentPage = event;
  }

}
