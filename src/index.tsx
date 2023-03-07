import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type GraphQLContextType = {
  endpoint: string;
  headers: object | undefined;
};
const GraphQLContext = createContext<GraphQLContextType>({
  endpoint: "",
  headers: {},
});

/**
 * GraphQL params ContextProvider.
 * Put it around your app to provide params when useGraphQL hook is initialized.
 * @param {ReactNode} children Context Provider children.
 * @param {String} endpoint Your GraphQL server endpoint URI.
 * @param {Headers} headers HTTP Optional request headers.
 * @returns
 * @example
 * import {GraphQLProvider} from "@mikadam/useGraphQL"
 *
 * export default function App(){
 *      return (
 *          <GraphQLProvider
 *              endpoint="https://yourdomain.com/graphql"
 *              headers={{
 *                  "Authorization":"yourBearerToken"
 *              }}>
 *              <YourAppScaffold/>
 *          </GraphQLProvider>
 *      )
 * }
 */

export function GraphQLProvider(props: {
  children: JSX.Element;
  endpoint: string;
  headers?: object;
}) {
  return (
    <GraphQLContext.Provider
      value={{ endpoint: props.endpoint, headers: props.headers }}
    >
      {props.children}
    </GraphQLContext.Provider>
  );
}

/**
 * GraphQL client request hook.
 * @param {string} query GraphQL query.
 * @param {Object} variables Query variables.
 * @param {boolean} loadOnStart If true, query is load when component is loaded.
 * @returns
 * @example
 * 
 const SIGNIN = `
  mutation($login:String!, $password:String!) {
    login(login:$login, password:$password) {
      success
      error
    }
  }
`;
export default function Auth() {
        const body = {
            login: "myusername",
            password: "awesomeP@ssword!",
        };

        const [login, { data, error, loading }] = useGraphQL({
            query: SIGNIN,
            variables: body,
            loadOnStart: true,
        });

        if (loading) return <p>Loading ...</p>;
        if (error) return <p>{error}</p>;
        if (data) return <p>{data.login.user}</p>;
        return <p>Nothing</p>;
}
 */

export default function useGraphQL(props: {
  query: string;
  variables?: object;
}) {
  const { endpoint, headers } = useContext(GraphQLContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const reset = () => {
    setLoading(false);
    setError(null);
    setData(null);
  };

  const loadData = async () => {
    try {
      const params = props.variables;
      const packet = {
        query: props.query,
        variables: params,
      };
      setLoading(true);
      const req = await fetch(endpoint, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify(packet),
      });
      const rs = await req.json();
      console.log(rs);
      setData(rs.data);
      setLoading(false);
      return rs.data;
    } catch (error: any) {
      setError(error);
    }
  };

  const submit = async (variables: any) => {
    try {
      const packet = {
        query: props.query,
        variables: variables,
      };
      setLoading(true);
      const req = await fetch(endpoint, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify(packet),
      });
      const rs = await req.json();
      if (rs.errors) {
        return rs.errors;
      }
      console.log(rs);
      setLoading(false);
      return rs.data;
    } catch (error: any) {
      setLoading(false);
      return { error: error.message };
    }
  };

  useEffect(() => {
    if (props.variables) {
      loadData();
    }
    return () => reset();
    // eslint-disable-next-line
  }, []);

  return {
    submit,
    loadData,
    data,
    reset,
    error,
    loading,
  };
}
