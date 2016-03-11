package com.redditclone.modules;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

public class SimpleCache extends ReactContextBaseJavaModule {

    private static final String TAG = "SimpleCache";
    private static final boolean DEBUG = true;
    private SharedPreferences mSharedPreferences;

    public SimpleCache(ReactApplicationContext context) {
        super(context);
        mSharedPreferences =
            context.getSharedPreferences(context.getPackageName(), Context.MODE_PRIVATE);
    }

    /**
     * Name for JS
     */
    @Override
    public String getName() {
        return "SimpleCacheAndroid";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        return constants;
    }

    /**
     * Annotations for JS
     */
    @ReactMethod
    public void putString(String key, String value) {
        Log.d(TAG, "putString: key=" + key + ", value=" + value);
        SharedPreferences.Editor editor = mSharedPreferences.edit();
        editor.commit();
    }

    @ReactMethod
    public void getString(String key, Callback callback) {
        String val = mSharedPreferences.getString(key, "");
        Log.d(TAG, "getString: key=" + key + ", val=" + val);
        callback.invoke();
    }

}
