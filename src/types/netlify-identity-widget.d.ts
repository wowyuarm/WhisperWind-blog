declare module 'netlify-identity-widget' {
  // 定义用户类型结构
  interface NetlifyUser {
    id: string;
    user_metadata: Record<string, unknown>;
    app_metadata: Record<string, unknown>;
    email?: string;
    token?: {
      access_token: string;
      expires_at: number;
      refresh_token: string;
      token_type: string;
    };
    [key: string]: unknown;
  }

  // 定义事件回调参数类型
  type EventCallbackParams = NetlifyUser | Error | string | null | undefined;

  const netlifyIdentity: {
    init: (options?: {
      container?: string;
      APIUrl?: string;
      logo?: boolean;
      locale?: string;
    }) => void;
    open: (callback?: (user?: NetlifyUser) => void) => void;
    close: () => void;
    currentUser: () => NetlifyUser | null;
    on: (event: string, callback: (...args: EventCallbackParams[]) => void) => void;
    logout: (callback?: () => void) => void;
    refresh: (callback?: (token: string) => void) => void;
  };
  export default netlifyIdentity;
} 