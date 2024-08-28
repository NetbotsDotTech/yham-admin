import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fakeData } from './makeData';

// CREATE hook
export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user) => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      return Promise.resolve();
    },
    onMutate: (newUserInfo) => {
      queryClient.setQueryData(['users'], (prevUsers) => [
        ...prevUsers,
        {
          ...newUserInfo,
          id: (Math.random() + 1).toString(36).substring(7)
        }
      ]);
    }
  });
}

// READ hook
export function useGetUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      return Promise.resolve(fakeData);
    },
    refetchOnWindowFocus: false
  });
}

// UPDATE hook
export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user) => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      return Promise.resolve();
    },
    onMutate: (newUserInfo) => {
      queryClient.setQueryData(['users'], (prevUsers) =>
        prevUsers?.map((prevUser) => (prevUser.id === newUserInfo.id ? newUserInfo : prevUser))
      );
    }
  });
}

// DELETE hook
export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId) => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      return Promise.resolve();
    },
    onMutate: (userId) => {
      queryClient.setQueryData(['users'], (prevUsers) => prevUsers?.filter((user) => user.id !== userId));
    }
  });
}
