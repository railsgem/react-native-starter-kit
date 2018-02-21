import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, RefreshControl, Image } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Error from './Error';
import Header from './Header';
import Spacer from './Spacer';

class ProjectListing extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    // success: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    // onFormSubmit: PropTypes.func.isRequired,
    projects: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    reFetch: PropTypes.func,
    // member: PropTypes.shape({
    //   firstName: PropTypes.string,
    //   lastName: PropTypes.string,
    //   email: PropTypes.string,
    // }).isRequired,
  }

  static defaultProps = {
    error: null,
    // success: null,
    reFetch: null,
  }

  constructor(props) {
    super(props);
    // this.state = {
    //   firstName: props.member.firstName || '',
    //   lastName: props.member.lastName || '',
    //   email: props.member.email || '',
    //   password: '',
    //   password2: '',
    //   changeEmail: false,
    //   changePassword: false,
    // };

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleChange = (name, val) => {
  //   this.setState({
  //     ...this.state,
  //     [name]: val,
  //   });
  // }
  //
  // handleSubmit = () => {
  //   this.props.onFormSubmit(this.state)
  //     .then(() => console.log('Profile Updated'))
  //     .catch(e => console.log(`Error: ${e}`));
  // }

  render() {
    const {
      loading,
      error,
      reFetch,
      projects,
    } = this.props;

    // Loading
    if (loading) return <Loading />;

    // Error
    if (error) return <Error content={error} />;

    const keyExtractor = item => item.id;

    const onPress = item => Actions.project({ match: { params: { id: String(item.id) } } });

    // const { loading, error, success } = this.props;

    // Loading
    if (loading) return <Loading />;

    return (
      <Container>
        <Content padder>
          <Header
            title="Top Projects"
            content="This is here to show how you can read and display data from a data source (in our case, Firebase)."
          />

          <FlatList
            numColumns={1}
            data={projects}
            renderItem={({ item }) => (
              <Card transparent style={{ paddingHorizontal: 6 }}>
                <CardItem cardBody>
                  <TouchableOpacity onPress={() => onPress(item)} style={{ flex: 1 }}>
                    <Image
                      source={{ uri: item.image }}
                      style={{
                        height: 100,
                        width: null,
                        flex: 1,
                        borderRadius: 5,
                      }}
                    />
                  </TouchableOpacity>
                </CardItem>
                <CardItem cardBody>
                  <Body>
                    <Spacer size={10} />
                    <Text style={{ fontWeight: '800' }}>{item.projectName}</Text>
                    <Spacer size={15} />
                    <Button
                      block
                      bordered
                      small
                      onPress={() => onPress(item)}
                    >
                      <Text>View Recipe</Text>
                    </Button>
                    <Spacer size={5} />
                  </Body>
                </CardItem>
              </Card>
            )}
            keyExtractor={keyExtractor}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={reFetch}
              />
            }
          />

          <Spacer size={20} />
        </Content>
      </Container>
    );
  }
}

export default ProjectListing;
