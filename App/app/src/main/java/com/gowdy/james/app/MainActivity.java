package com.gowdy.james.commuter;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebChromeClient;
import android.webkit.ConsoleMessage;
import android.util.Log;

public class MainActivity extends Activity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {

    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    WebView myWebView = (WebView) findViewById(R.id.myWebView);

    myWebView.setWebChromeClient(new WebChromeClient() {
      public boolean onConsoleMessage(ConsoleMessage cm) {
        Log.d("MyApplication", cm.message() + " -- From line "
            + cm.lineNumber() + " of "
            + cm.sourceId() );
        return true;
      }
    });

    myWebView.setWebViewClient(new MyWebViewClient());
    WebSettings webSettings = myWebView.getSettings();
    webSettings.setJavaScriptEnabled(true);
    webSettings.setAllowFileAccessFromFileURLs(true); //Maybe you don't need this rule
    webSettings.setAllowUniversalAccessFromFileURLs(true);
    webSettings.setDomStorageEnabled(true);
    myWebView.setWebViewClient(new WebViewClient());

    myWebView.loadUrl("file:///android_asset/www/index.html");
  }

  // Use When the user clicks a link from a web page in your WebView
  private class MyWebViewClient extends WebViewClient {
    @Override
    public boolean shouldOverrideUrlLoading(WebView view, String url) {

//      if (Uri.parse(url).getHost().equals("www.centerend.com")) {
//          return false;
//      }
//
//      Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
//      startActivity(intent);
      return true;
    }

  }
}
