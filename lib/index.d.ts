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
export declare function GraphQLProvider(props: {
    children: JSX.Element;
    endpoint: string;
    headers?: object;
}): JSX.Element;
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
    variables: object;
}): {
    loadData: (vars?: any) => Promise<void>;
    data: null;
    reset: () => void;
    error: null;
    loading: boolean;
};
