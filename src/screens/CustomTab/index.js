import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Paragraph } from 'components';
import theme from 'assets/theme';
import colors from 'assets/colors';
let icons = [],
  selectedTabIcons = [],
  unselectedTabIcons = [];
class CustomTabBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  componentDidMount() {
    this._listener = this.props.scrollValue.addListener(
      this.setAnimationValue.bind(this),
    );
  }

  setAnimationValue({ value }) {
    this.icons.forEach((icon, i) => {
      const progress = value - i >= 0 && value - i <= 1 ? value - i : 1;
      icon.setNativeProps({
        style: {
          color: this.iconColor(progress),
        },
      });
    });
  }

  renderTabOption(name, page) {
    let isTabActive = this.props.activeTab === page;
    return (
      <TouchableOpacity
        key={name}
        onPress={() => this.props.goToPage(page)}
        style={[styles.tab]}
      >
        <Icon
          name={name}
          size={30}
          color={colors.blue}
          style={styles.icon}
          ref={icon => {
            selectedTabIcons[page] = icon;
          }}
        />

        <Icon
          name={name}
          size={30}
          color={colors.disabledIconColor}
          style={styles.icon}
          ref={icon => {
            unselectedTabIcons[page] = icon;
          }}
        />

        <View style={[isTabActive ? tabUnderlineStyle : null]} />
      </TouchableOpacity>
    );
  }

  setAnimationValue({ value }) {
    unselectedTabIcons.forEach((icon, i) => {
      let iconRef = icon;
      if (!icon.setNativeProps && icon !== null) {
        iconRef = icon.refs.icon_image;
      }

      if (value - i >= 0 && value - i <= 1) {
        iconRef.setNativeProps({ style: { opacity: value - i } });
      }
      if (i - value >= 0 && i - value <= 1) {
        iconRef.setNativeProps({ style: { opacity: i - value } });
      }
    });
  }

  render() {
    let containerWidth = this.props.containerWidth,
      numberOfTabs = this.props.tabs.length;
    (width = containerWidth / numberOfTabs),
      (tabUnderlineStyle = {
        position: 'absolute',
        width,
        height: 3,
        backgroundColor: colors.blue,
        bottom: 0,
      });
    return (
      <View>
        <View style={[styles.tabs, this.props.style]}>
          {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    height: 45,
    flexDirection: 'row',
    paddingTop: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    backgroundColor: theme.backgroundColor,
  },
  icon: {
    position: 'absolute',
    top: 0,
    //left: 35,
  },
  img: {
    width: 375,
    height: 550,
  },
  title: {
    color: '#fff',
    fontSize: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 60,
  },
});

export default CustomTabBar;
