import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getRecipes, setError } from '../actions/projects';

class ProjectListing extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    projects: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      projects: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({}),
    }),
    getRecipes: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
  }

  static defaultProps = {
    match: null,
  }

  componentDidMount = () => this.fetchProjects();

  /**
    * Fetch Data from API, saving to Redux
    */
  fetchProjects = (reFetch = false) => {
    if (reFetch || this.props.projects.projects[0].placeholder) {
      return this.props.getRecipes()
        .catch((err) => {
          console.log(`Error: ${err}`);
          return this.props.setError(err);
        });
    }

    return false;
  }

  render = () => {
    const { Layout, projects, match } = this.props;
    const id = (match && match.params && match.params.id) ? match.params.id : null;

    return (
      <Layout
        recipeId={id}
        error={projects.error}
        loading={projects.loading}
        projects={projects.projects}
        reFetch={() => this.fetchProjects(true)}
      />
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projects || {},
});

const mapDispatchToProps = {
  getRecipes,
  setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListing);
