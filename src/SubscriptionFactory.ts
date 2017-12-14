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
            const newSubscriptionName = subscriptionName(model, 'created')

            subscriptions[newSubscriptionName] = {
                type: modelType,
                resolve: (payload) => {
                    return payload
                },
                subscribe: () => this.pubsub.asyncIterator(newSubscriptionName)
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
            const newSubscriptionName = subscriptionName(model, 'updated')

            subscriptions[newSubscriptionName] = {
                type: createNonNullList(modelType),
                resolve: (payload) => {
                    return payload
                },
                subscribe: () => this.pubsub.asyncIterator(newSubscriptionName)
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
            const newSubscriptionName = subscriptionName(model, 'deleted')

            subscriptions[newSubscriptionName] = {
                type: createNonNullList(modelType),
                subscribe: () => this.pubsub.asyncIterator(newSubscriptionName)
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
            const newSubscriptionName = subscriptionName(model, 'updatedOne')

            subscriptions[newSubscriptionName] = {
                type: modelType,
                subscribe: () => this.pubsub.asyncIterator(newSubscriptionName)
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
            const newSubscriptionName = subscriptionName(model, 'updatedOne')

            subscriptions[newSubscriptionName] = {
                type: modelType,
                subscribe: () => this.pubsub.asyncIterator(newSubscriptionName)
            }
        } 
}

export interface SubscriptionFactoryConfig {
    pubsub: PubSub
}

export interface Subscriptions extends GraphQLFieldConfigMap<any, any> {
    [subscriptionName: string]: GraphQLFieldConfig<any, any>;
}