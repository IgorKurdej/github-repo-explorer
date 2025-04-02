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

export interface ICommit {
  oid: string;
  messageHeadline: string;
  committedDate: string;
  author: {
    name: string;
  };
}

export interface IRepositoryDetails extends IRepository {
  description?: string;
  createdAt: string;
  pullRequests: { totalCount: number };
  issues: { totalCount: number };
  defaultBranchRef?: {
    target?: {
      history: {
        nodes: ICommit[];
      };
    };
  };
}

export interface IRepositoryResponse {
  repository: IRepositoryDetails;
}

export interface IRepositoryVariables {
  owner: string;
  name: string;
}
