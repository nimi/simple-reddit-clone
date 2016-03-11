//
//  SimpleCache.swift
//  RedditClone
//
//  Created by Nicholas Mitchell on 3/10/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

import Foundation

@objc(SimpleCache)
class SimpleCache: NSObject {
  
  var defaults = NSUserDefaults.standardUserDefaults()
  
  @objc func putString(key: String, value: String) {
    defaults.setObject(value, forKey: key)
    print(defaults.stringForKey(key))
  }
  
  @objc func getString(key: String, callback: RCTResponseSenderBlock) {
    let value = defaults.stringForKey(key)
    if (value == nil) {
      callback([])
    } else {
      callback([value!])
    }
  }
  
}
