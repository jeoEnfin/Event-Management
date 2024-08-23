import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ChatTokenApi } from '../apis/ChatTokenApi';
import AsyncStorageUtil from '../../../utils/services/LocalCache';
import WebView from 'react-native-webview';
import OverlayLoader from '../../../components/modals/OverlayLoader';
import { config } from '../../../utils/config';

type Props = {
  route: any;
}

const Messages = ({ route }: Props) => {
  const { data, expId } = route.params;
  const [loading, setLoading] = useState<boolean>(false);
  const [chatToken, setChatToken] = useState<string>('')

  useEffect(() => {
    console.log(data)
    if (data && expId) {
      checkChatToken();
    }
  }, [data, expId])

  const checkChatToken = async () => {
    // const chatTokenLocal = await AsyncStorageUtil.getData(`chatToken${expId}`);
    // if (chatTokenLocal) {
    //   setChatToken(chatTokenLocal);
    // }
    // else {
      getChatToken();
    //}
  }

  const getChatToken = async () => {
    setLoading(true);
    try {
      const chatToken = await ChatTokenApi({ data });
      if (chatToken) {
        console.log('chat token', chatToken?.data)
        setChatToken(chatToken?.data?.data)
        //await AsyncStorageUtil.saveData(`chatToken${expId}`, chatToken?.data?.data)
      }
      setLoading(false);

    } catch (err: any) {
      console.log('Chat token error', err)
      setLoading(false);
    }
  }


  return (
    <View style={styles.container}>
      {chatToken !== null &&
        <WebView
          source={{ uri: `${config.CHAT_URL}${chatToken}` }}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          style={styles.container}
          mixedContentMode='always'
          allowsFullscreenVideo
          javaScriptEnabled={true}
          domStorageEnabled={true}  // Enable DOM storage
          userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36" // Set user agent to a desktop browser
        />}
      <OverlayLoader visible={loading} />
    </View>
  )
}

export default Messages

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%'
  },
})