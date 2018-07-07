package com.qr;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.ocetnik.timer.BackgroundTimerPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import org.reactnative.camera.RNCameraPackage;

import com.dylanvann.fastimage.FastImageViewPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new BackgroundTimerPackage(),
            new ReactNativePushNotificationPackage(),
            new RNCameraPackage(),
            new FastImageViewPackage()
            
            
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    // Setup handler for uncaught exceptions.
    Thread.setDefaultUncaughtExceptionHandler (new Thread.UncaughtExceptionHandler()
    {
      @Override
      public void uncaughtException (Thread thread, Throwable e)
      {
        handleUncaughtException (thread, e);
      }
    });
  }
  public void handleUncaughtException (Thread thread, Throwable e)
  {

    if(e.getMessage() != "closed" || thread.getName() != "OkHttp Dispatcher"){
      //Kill the app
      System.exit(1);
    }else{
      //If the OkHttp error occurs we ignore it
      Log.e("OkHttp Exception","Received exception " + e.getMessage() + "From thread " + thread.getName());
    }

  }
}
