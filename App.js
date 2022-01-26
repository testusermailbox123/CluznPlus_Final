import React from 'react';
import HomeStackScreen from './components/NewApp/Navigation'

export default class App extends React.Component {
  render() {
    return (
      <HomeStackScreen />
    )
  }
}


// import React, { Component } from "react";
// import {
//   Animated,
//   Dimensions,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View
// } from "react-native";

// import { widthtoDP, heighttoDP } from './components/NewApp/Responsive';

// const xOffset = new Animated.Value(0);

// const data = [
//   {
//     id: '1',
//     name: 'var'
//   },
//   {
//     id: '2',
//     name: 'var'
//   },
//   {
//     id: '3',
//     name: 'var'
//   },
// ]

// const Screen = props => {
//   return (
//     <View style={styles.scrollPage}>
//       <Animated.View style={[styles.screen, transitionAnimation(props.index)]}>
//         <Text style={styles.text}>{props.text}</Text>
//       </Animated.View>
//     </View>
//   );
// };

// const transitionAnimation = index => {
//   return {
//     transform: [
//       { perspective: 800 },
//       {
//         scale: xOffset.interpolate({
//           inputRange: [
//             (index - 1) * widthtoDP(number = '100%'),
//             index * widthtoDP(number = '100%'),
//             (index + 1) * widthtoDP(number = '100%')
//           ],
//           outputRange: [0.25, 1, 0.25]
//         })
//       },
//       {
//         rotateX: xOffset.interpolate({
//           inputRange: [
//             (index - 1) * widthtoDP(number = '100%'),
//             index * widthtoDP(number = '100%'),
//             (index + 1) * widthtoDP(number = '100%')
//           ],
//           outputRange: ["45deg", "0deg", "45deg"]
//         })
//       },
//       {
//         rotateY: xOffset.interpolate({
//           inputRange: [
//             (index - 1) * widthtoDP(number = '100%'),
//             index * widthtoDP(number = '100%'),
//             (index + 1) * widthtoDP(number = '100%')
//           ],
//           outputRange: ["-45deg", "0deg", "45deg"]
//         })
//       }
//     ]
//   };
// };

// export default class App extends Component {
//   render() {
//     return (
//       <Animated.ScrollView
//         scrollEventThrottle={16}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { x: xOffset } } }],
//           { useNativeDriver: true }
//         )}
//         horizontal
//         pagingEnabled
//         style={styles.scrollView}
//       >
//         {data.map((myitem) => {
//           return (
//         <Screen text={myitem.name} index={myitem.id} />
//           )
//         })
//         }
//       </Animated.ScrollView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   scrollView: {
//     flexDirection: "row",
//     backgroundColor: "#00d4ff"
//   },
//   scrollPage: {
//     width: widthtoDP(number = '100%'),
//     padding: 20
//   },
//   screen: {
//     height: 600,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 25,
//     backgroundColor: "white"
//   },
//   text: {
//     fontSize: 45,
//     fontWeight: "bold"
//   }
// });