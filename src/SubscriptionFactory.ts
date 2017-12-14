// tslint:disable-next-line:no-reference
/// <reference path="./@types/graphql-sequelize/index.d.ts" />

import {
    Model
} from "./types";
import {
    GraphQLFieldConfigMap,
    GraphQLFieldConfig,
    GraphQLObjectType
} from 'graphql'
import {
    subscriptionName
} from './utils'
import {
    PubSub
} from 'graphql-subscriptions'
import { 
    createNonNullList 
} from "./utils";

export class SubscriptionFactory {

    private pubsub: PubSub;

    constructor(config: SubscriptionFactoryConfig) {
        this.pubsub = config.pubsub;
    }

    public created({
        subscriptions,
        model,
        modelType
    }: {
        model: Model,
        modelType: GraphQLObjectType
        subscriptions: Subscriptions
        }) {
            const createdSubscriptionName = subscriptionName(model, 'created')

            subscriptions[createdSubscriptionName] = {
                type: createNonNullList(modelType),
                subscribe: () => this.pubsub.asyncIterator(createdSubscriptionName)
            }
        } 

    public updated({
        subscriptions,
        model,
        modelType
    }: {
        model: Model,
        modelType: GraphQLObjectType
        subscriptions: Subscriptions
        }) {
            const createdSubscriptionName = subscriptionName(model, 'updated')

            subscriptions[createdSubscriptionName] = {
                type: createNonNullList(modelType),
                subscribe: () => this.pubsub.asyncIterator(createdSubscriptionName)
            }
        } 
    
    public deleted({
        subscriptions,
        model,
        modelType
    }: {
        model: Model,
        modelType: GraphQLObjectType
        subscriptions: Subscriptions
        }) {
            const createdSubscriptionName = subscriptionName(model, 'deleted')

            subscriptions[createdSubscriptionName] = {
                type: createNonNullList(modelType),
                subscribe: () => this.pubsub.asyncIterator(createdSubscriptionName)
            }
        } 

    public updatedOne({
        subscriptions,
        model,
        modelType
    }: {
        model: Model,
        modelType: GraphQLObjectType
        subscriptions: Subscriptions
        }) {
            const createdSubscriptionName = subscriptionName(model, 'updatedOne')

            subscriptions[createdSubscriptionName] = {
                type: createNonNullList(modelType),
                subscribe: () => this.pubsub.asyncIterator(createdSubscriptionName)
            }
        } 
    
    public deletedOne({
        subscriptions,
        model,
        modelType
    }: {
        model: Model,
        modelType: GraphQLObjectType
        subscriptions: Subscriptions
        }) {
            const createdSubscriptionName = subscriptionName(model, 'updatedOne')

            subscriptions[createdSubscriptionName] = {
                type: createNonNullList(modelType),
                subscribe: () => this.pubsub.asyncIterator(createdSubscriptionName)
            }
        } 
}

export interface SubscriptionFactoryConfig {
    pubsub: PubSub
}

export interface Subscriptions extends GraphQLFieldConfigMap<any, any> {
    [subscriptionName: string]: GraphQLFieldConfig<any, any>;
}