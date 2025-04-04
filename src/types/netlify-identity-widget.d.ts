declare module 'netlify-identity-widget' {
  const netlifyIdentity: {
    init: (options?: {
      container?: string;
      APIUrl?: string;
      logo?: boolean;
      locale?: string;
    }) => void;
    open: (callback?: (user?: any) => void) => void;
    close: () => void;
    currentUser: () => any;
    on: (event: string, callback: (...args: any[]) => void) => void;
    logout: (callback?: () => void) => void;
    refresh: (callback?: (token: string) => void) => void;
  };
  export default netlifyIdentity;
} 