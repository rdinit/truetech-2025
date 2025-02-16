export interface ReportIssueTemplate {
  name: string;
  description: string;
}

export interface ReportIssueItem extends ReportIssueTemplate {
  id: number;
}

export interface UkRequestTemplate {
  name: string;
  description: string;
}

export interface UkRequestItem extends UkRequestTemplate {
  id: number;
}

export interface HelpRequestTemplate {
  name: string;
  description: string;
}

export interface HelpRequestItem extends HelpRequestTemplate {
  id: number;
}
