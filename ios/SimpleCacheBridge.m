//
//  SimpleCacheBridge.m
//  RedditClone
//
//  Created by Nicholas Mitchell on 3/10/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(SimpleCache, NSObject)

RCT_EXTERN_METHOD(putString:(NSString *)key value:(NSString *) value)
RCT_EXTERN_METHOD(getString:(NSString *)key callback:(RCTResponseSenderBlock *) callback)

@end