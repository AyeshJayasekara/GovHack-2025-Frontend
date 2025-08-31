import AppBackground from "@/components/AppBackground";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View
} from "react-native";
import Markdown from 'react-native-markdown-display';
import { ActivityIndicator, Button, Card, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const {width} = Dimensions.get("window");

export default function Index() {
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState([
        {id: "1", text: "Hello! I'm Gov Assist? How Can I Help You?", from: "bot"},
    ]);
    const [text, setText] = useState("");
    const scrollViewRef = useRef<ScrollView>(null);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({animated: true});
    }, [messages]);

    let Link = "https://mermaid.ink/img/pako:eNo9jU1vgzAMhv9K5DNChI9Cch2aNmnTpKmnKRevuBC1JCiEbR3ivy8FsfgSP68fe4aTbQgkDJrY2NnvGj0qw8Lz2l-JvRB-0ciOeCHDPm-spgGd78n4bUrB07sCJlmWljt51AbNiTYsih2_DeTQa2vGLTmIPXk-boQnO3lFdyGvTbsGqeDKQASt0w1I7yaKoCfX472F-S4p8B314aYM3ybYCpRZgjOg-bC23zVnp7YDecbrGLppaNBTrbF12P9TR6Yh92An40Hyct0BcoYfkOmhinlepnmZ8TwvMh7BDWRWxhlP86oqikIkVbpE8LveTOKqzIUQVSjOg7b8AX_9bG0?type=png)](https://mermaid.live/edit#pako:eNo9jU1vgzAMhv9K5DNChI9Cch2aNmnTpKmnKRevuBC1JCiEbR3ivy8FsfgSP68fe4aTbQgkDJrY2NnvGj0qw8Lz2l-JvRB-0ciOeCHDPm-spgGd78n4bUrB07sCJlmWljt51AbNiTYsih2_DeTQa2vGLTmIPXk-boQnO3lFdyGvTbsGqeDKQASt0w1I7yaKoCfX472F-S4p8B314aYM3ybYCpRZgjOg-bC23zVnp7YDecbrGLppaNBTrbF12P9TR6Yh92An40Hyct0BcoYfkOmhinlepnmZ8TwvMh7BDWRWxhlP86oqikIkVbpE8LveTOKqzIUQVSjOg7b8AX_9bG0"

//     const predefinedAnswers = [
//     "I found related information from the following source: Statistics on Australian Government Procurement Contracts. Do you want me to proceed with my analysis of potential red flags in your procurement data?",
//     `Question: What are some red flags identified from our procurement data?

// Answer: Several red flags can be observed within the Australian Government Procurement Data for FY2023-24, which include but may not necessarily cover all concerns as per your request. Here's a summary of potential issues based on available context information and relevant links to original datasets where applicable (please note that some details might require further investigation beyond the provided data):

// 1. **SME Participation:** Despite setting targets for SME participation, actual involvement in procurement contracts is below expectations with only 18.8% of total value awarded to non-corporate entities (smaller than targeted at least 20%). This discrepancy suggests a potential barrier or lack of accessibility and opportunities for SMEs within the government procurement process, which could be considered as red flags regarding inclusivity. [Link: Summary Data](https://www.finance.gov.au/government/procurement/statistics-australian-government-procurement-contracts)

// 2. **High Value of Contracts with Defence Department:** The dominance of the Department of Defence in contract value, particularly for specialized goods like aircraft and missiles (representing 67.44%), may skew overall participation metrics against smaller entities due to their disproportionate influence on procurement data distribution. [Link: Top Entities Data](https://www.finance.gov.au/government/procurement/statistics-australian-government-procurement-contracts)

// ## 📌 Meta-Assessment 

// - **🔗 Source Relevance** - (99%) → Data taken directly from official Australian Government Procurement Statistics (Finance.gov.au).  
// - **📏 Data Accuracy** - (99.5%) → Figures (18.8%, 67.44%, 52.35%) assumed to be 99% accurate as per official reporting.  
// - **🔍 Cross-Validation** - (99.2%) → Can be compared with ATO SME reports, industry submissions, and historical trends (FY2020–23).  
// - **⚖️ Bias Assessment** - (99.3%) → Defence-heavy weighting may mask SME gains elsewhere; policy adjustments reflect recognition of imbalance.  
// `,
  
// ];

const DIAGRAM_PNG =
  "https://mermaid.ink/img/pako:eNo9jU1vgzAMhv9K5DNChI9Cch2aNmnTpKmnKRevuBC1JCiEbR3ivy8FsfgSP68fe4aTbQgkDJrY2NnvGj0qw8Lz2l-JvRB-0ciOeCHDPm-spgGd78n4bUrB07sCJlmWljt51AbNiTYsih2_DeTQa2vGLTmIPXk-boQnO3lFdyGvTbsGqeDKQASt0w1I7yaKoCfX472F-S4p8B314aYM3ybYCpRZgjOg-bC23zVnp7YDecbrGLppaNBTrbF12P9TR6Yh92An40Hyct0BcoYfkOmhinlepnmZ8TwvMh7BDWRWxhlP86oqikIkVbpE8LveTOKqzIUQVSjOg7b8AX_9bG0?type=png";

const predefinedAnswers = [
  `[📄 View diagram (PNG)](${DIAGRAM_PNG})`,
];
  const [questionCount, setQuestionCount] = useState(0);

const handleSend = async () => {
  Keyboard.dismiss();
  if (text.trim().length === 0) return;

  const userMessage = { id: Date.now().toString(), text, from: "user" };
  setMessages((prev) => [...prev, userMessage]);
  setText("");
  setIsTyping(true);

  try {
    // instead of calling API, check if question exists in predefined list
    //let answer = await sendChat(text);
   let answer = predefinedAnswers[questionCount] || "Sorry, I don’t know that one yet.";

    setIsTyping(false);
    const botMessageId = (Date.now() + 1).toString();
    let partialText = "";
    setQuestionCount((prev) => prev+1);

    // Add empty bot message to start streaming into
    setMessages((prev) => [...prev, { id: botMessageId, text: "", from: "bot" }]);

    // Stream character by character
    for (const element of answer) {
      partialText += element;
      await new Promise((resolve) => setTimeout(resolve, 1)); // 5ms delay

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId ? { ...msg, text: partialText } : msg
        )
      );
    }
  } catch (err) {
    console.error(err);
  }
};

    return (
        <AppBackground>
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
                >
                    {/* Message List */}
                    <ScrollView
                        ref={scrollViewRef}
                        contentContainerStyle={styles.scrollContent}
                        keyboardShouldPersistTaps="handled"
                    >
                        {messages.map((msg) => (
                            <View
                                key={msg.id}
                                style={[
                                    styles.messageWrapper,
                                    msg.from === "user" ? styles.userAlign : styles.botAlign,
                                ]}
                            >

                                <Card
                                    elevation={4}
                                    style={[
                                        styles.messageCard,
                                        msg.from === "user" ? styles.userCard : styles.botCard,
                                    ]}
                                >
                                    <Card.Content>
                                        <Markdown style={{
                                            body: {fontSize: 18},
                                            strong: {fontWeight: "bold", color: "#222"},
                                            link: {color: "#1E88E5"},
                                        }}>
                                            {msg.text}
                                        </Markdown>
                                    </Card.Content>
                                </Card>

                            </View>
                        ))}

                        {isTyping && (
                            <View style={[styles.messageWrapper, styles.botAlign]}>
                                <Card style={[styles.messageCard, styles.botCard]}>
                                    <Card.Content>
                                        <ActivityIndicator animating={true} size="small" />
                                    </Card.Content>
                                </Card>
                            </View>
                        )}
                    </ScrollView>

                    {/* Input + Send */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            mode="outlined"
                            placeholder="Type a message..."
                            value={text}
                            onChangeText={setText}
                            multiline
                            style={styles.textInput}
                        />
                        <Button mode="contained" onPress={handleSend} style={styles.sendButton}>
                            Send
                        </Button>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 80,
    },
    messageWrapper: {
        marginVertical: 4,
        flexDirection: "row",
    },
    userAlign: {
        justifyContent: "flex-end",
    },
    botAlign: {
        justifyContent: "flex-start",
    },
    messageCard: {
        maxWidth: width * 0.8,
        padding: 4
    },
    userCard: {
        backgroundColor: "#DCF8C6",
    },
    botCard: {
        backgroundColor: "#E8E8E8",
    },
    inputContainer: {
        flexDirection: "row",
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderTopWidth: 1,
        alignItems: "flex-end",
    },
    textInput: {
        flex: 1,
        marginRight: 8,
        color: "red",
    },
    sendButton: {
        alignSelf: "center",
    },
});