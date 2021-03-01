import { Component, ComponentClass, ComponentType } from "react";
import { firebase } from '../utils/fireBase';
// import {RouteComponentProps } from 'react-router';

interface IMyComponentState {
  isAuthenticated: boolean;
}

// interface DetailParams {
//   id: string;
// }

// interface DetailsProps {
//   required: string;
//   match?: history<DetailParams>;
// }

// interface Try extends RouteComponentProps<any> {
//   history: any
// }

function withAuth(
): <P extends object>(WrappedComponent: ComponentType<P>) => ComponentClass<P> {
  return <P extends object>(WrappedComponent: ComponentType<P>) =>
    class BadgedComponent extends Component<P, IMyComponentState> {
      constructor(props: any) {
        super(props);

        this.state = {
          isAuthenticated: false
        }

        this.handleFirebase = this.handleFirebase.bind(this);
      }

      componentDidMount() {
        this.handleFirebase();
      }


      handleFirebase() {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            // const { history } = this.props;
            // console.log(history);
            this.setState({isAuthenticated: true})
          }
          else {
            this.setState({isAuthenticated: false})
          }
        });  
      } 

      public render() {
        // console.log(this.props.history, "props");
        const { isAuthenticated }  = this.state;

        if (!isAuthenticated) {
          return <div>Ini belom login!</div>
        }

        return <WrappedComponent {...this.props} />
      }
    };
}

export default withAuth;