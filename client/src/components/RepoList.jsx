import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <div>{props.repos.map((el, index) => <li key= {index}> <a href = {el.repoURL}>{el.repoName} by: {el.githubUserName}</a></li>)}</div>
  </div>
)

export default RepoList;