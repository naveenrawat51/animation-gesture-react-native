import React, { useState } from 'react';
import {
    View,
    Animated,
    PanResponder,
    Dimensions,
    StyleSheet,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

export default function Deck({
    data,
    renderCard,
    onSwipeLeft,
    onSwipeRight,
    noMoreCards,
}) {
    const [index, setIndex] = useState(0);
    const position = new Animated.ValueXY();

    const resetPosition = () => {
        Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
        }).start();
    };

    const onSwipeComplete = (direction) => {
        const item = data[index];
        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
        position.setValue({ x: 0, y: 0 });
        setIndex(index + 1);
    };

    const forceSwipe = (direction) => {
        const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
        Animated.timing(position, {
            toValue: { x, y: 0 },
            duration: SWIPE_OUT_DURATION,
            useNativeDriver: false,
        }).start(() => onSwipeComplete(direction));
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gesture) => {
            position.setValue({ x: gesture.dx, y: gesture.dy });
        },
        onPanResponderRelease: (event, gesture) => {
            if (gesture.dx > SWIPE_THRESHOLD) {
                console.log('swipe right');
                forceSwipe('right');
            } else if (gesture.dx < -SWIPE_THRESHOLD) {
                console.log('swipe left');
                forceSwipe('left');
            } else {
                resetPosition();
            }
        },
    });

    const getCardStyle = () => {
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
            outputRange: ['-120deg', '0deg', '120deg'],
        });

        return {
            ...position.getLayout(),
            transform: [{ rotate: rotate }],
        };
    };

    const renderCards = () => {
        if (index >= data.length) {
            return noMoreCards();
        }

        return data
            .map((item, ind) => {
                if (ind < index) {
                    return null;
                }
                if (ind === index) {
                    return (
                        <Animated.View
                            key={item.id}
                            style={[getCardStyle(), styles.cardStyle]}
                            {...panResponder.panHandlers}
                        >
                            {renderCard(item)}
                        </Animated.View>
                    );
                }
                return (
                    <View key={item.id} style={styles.cardStyle}>
                        {renderCard(item)}
                    </View>
                );
            })
            .reverse();
    };

    return <View>{renderCards()}</View>;
}

const styles = StyleSheet.create({
    cardStyle: {
        position: 'absolute',
        width: SCREEN_WIDTH,
    },
});
