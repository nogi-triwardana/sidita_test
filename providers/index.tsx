import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient();

const Providers: React.FC<TProviderProps> = ({
  children,
  session
}) => {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
          <SnackbarProvider>
            {children}
          </SnackbarProvider>
        </QueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;