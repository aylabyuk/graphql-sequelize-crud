export const createResolver = (resolver: any) => {
    const baseResolver = resolver;
    baseResolver.createResolver = (childResolver: any) => {
      const newResolver = async (parent: any, args: any, context: any) => {
        await resolver(parent, args, context);
        return childResolver(parent, args, context);
      };
      return createResolver(newResolver);
    };
    return baseResolver;
};
  