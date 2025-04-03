// zaktualizowane typy dla paginacji
export interface IGithubUser {
  login: string;
  avatarUrl: string;
}

export interface ISearchUsersResponse {
  search: {
    nodes: IGithubUser[];
  };
}

export interface IGetGithubUsersVariables {
  query: string;
}

export interface IRepository {
  name: string;
}

export interface IUserRepositoriesResponse {
  user: {
    repositories: {
      nodes: IRepository[];
    };
  };
}

export interface IGetRepositoriesByUsernameVariables {
  login: string;
}

export interface IPageInfo {
  hasNextPage: boolean;
  endCursor: string;
}

export interface ICommit {
  id: string;
  oid: string;
  messageHeadline: string;
  committedDate: string;
  author: {
    name: string;
    email?: string;
    avatarUrl?: string;
  };
}

export interface ICommitHistory {
  pageInfo: IPageInfo;
  nodes: ICommit[];
}

export interface IRepositoryDetails extends IRepository {
  id: string;
  description?: string;
  createdAt: string;
  url: string;
  owner: {
    login: string;
    avatarUrl: string;
  };
  pullRequests: { totalCount: number };
  issues: { totalCount: number };
  defaultBranchRef?: {
    target?: {
      history: ICommitHistory;
    };
  };
}

export interface IRepositoryResponse {
  repository: IRepositoryDetails;
}

export interface IRepositoryVariables {
  owner: string;
  name: string;
  first: number;
  after: string | null;
}
