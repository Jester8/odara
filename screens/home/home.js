import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Search from './components/Search';
import Product from './components/Product';

import useAuthStore from '../src/store/useAuthStore';  

const { width } = Dimensions.get('window');

const categories = [
  { title: 'Fashion Apparels', icon: 'checkroom', subcategories: ['Men', 'Women', 'Kids'] },
  { title: 'Arts and Crafts', icon: 'palette', subcategories: ['Paintings', 'Handmade Items', 'beads'] },
  { title: 'Home Decor', icon: 'weekend', subcategories: ['Furniture', 'Wall Art'] },
  { title: 'Beauty & Personal Care', icon: 'spa', subcategories: ['Skincare', 'Makeup'] },
  { title: 'Accessories', icon: 'watch', subcategories: ['Bags', 'Jewelry', 'Hats'] },
  { title: 'Shoes', icon: 'hiking', subcategories: ['Men', 'Women', 'Kids'] },
  { title: 'Electronics', icon: 'devices-other', subcategories: ['Phones', 'Smart Gadgets'] },
  { title: 'Groceries', icon: 'shopping-cart', subcategories: ['Food Items', 'Spices'] },
  { title: 'Health', icon: 'health-and-safety', subcategories: ['Supplements', 'Natural Remedies'] },
  { title: 'Books', icon: 'menu-book', subcategories: ['Fiction', 'Non-fiction', 'African Authors'] },
  { title: 'Music & Instruments', icon: 'music-note', subcategories: ['Instruments', 'CDs'] },
  { title: 'Toys & Games', icon: 'toys', subcategories: ['Board Games', 'Educational Toys'] },
  { title: 'Traditional', icon: 'style', subcategories: ['Attire', 'Artifacts'] },
  { title: 'Jewelry', icon: 'diamond', subcategories: ['Necklaces', 'Bracelets'] },
  { title: 'Furniture', icon: 'chair', subcategories: ['Chairs', 'Tables'] },
];

const HomeScreen = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const drawerAnim = useState(new Animated.Value(-width))[0];
  const navigation = useNavigation();

  const { user } = useAuthStore(); 

  const openDrawer = () => {
    setDrawerVisible(true);
    Animated.timing(drawerAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(drawerAnim, {
      toValue: -width,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setDrawerVisible(false));
  };

  const toggleCategory = (index) => {
    setExpandedCategory(index === expandedCategory ? null : index);
  };

  const Header = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={openDrawer} style={styles.iconCircle}>
        <MaterialIcons name="menu" size={24} color="#000" />
      </TouchableOpacity>

      <Image
        source={require('../../assets/logo/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(user ? 'UserProfile' : 'GuestProfile')
        }
      >
        <Image
          source={{
            uri: user?.avatar || 'https://i.pravatar.cc/100?img=3', 
          }}
          style={styles.profileImage}
        />
      </TouchableOpacity>
    </View>
  );

  const renderDrawer = () => (
    <Animated.View style={[styles.drawerWrapper, { left: drawerAnim }]}>
      <View style={styles.drawer}>
        <View style={styles.drawerHeader}>
          <Text style={styles.drawerTitle}>Categories</Text>
          <TouchableOpacity onPress={closeDrawer}>
            <MaterialIcons name="close" size={28} color="black" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={categories}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>VIEW ALL ITEMS</Text>
            </TouchableOpacity>
          }
          renderItem={({ item, index }) => (
            <View key={index}>
              <TouchableOpacity
                style={styles.categoryItem}
                onPress={() => toggleCategory(index)}
              >
                <MaterialIcons
                  name={item.icon}
                  size={20}
                  color="#4B0082"
                  style={{ marginRight: 10 }}
                />
                <Text style={styles.categoryText}>{item.title}</Text>
                <MaterialIcons
                  name={expandedCategory === index ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                  size={20}
                  color="#999"
                  style={{ marginLeft: 'auto' }}
                />
              </TouchableOpacity>

              {expandedCategory === index &&
                item.subcategories.map((sub, subIndex) => (
                  <View style={styles.subCategoryItem} key={subIndex}>
                    <Text style={styles.subCategoryText}>• {sub}</Text>
                  </View>
                ))}
            </View>
          )}
        />
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <FlatList
        data={[{ id: 'products' }]}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Search />}
        renderItem={() => <Product />}
        showsVerticalScrollIndicator={false}
      />

      {drawerVisible && renderDrawer()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 10 : 0,
  },
  logo: {
    width: 100,
    height: 40,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  iconCircle: {
    padding: 8,
  },
  drawerWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: width,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 10,
  },
  drawer: {
    width: width * 0.75,
    backgroundColor: '#fff',
    height: '100%',
    padding: 16,
    fontFamily: 'BricolageGrotesque_700Bold',
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 20,
    paddingTop: 20,
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    fontFamily: 'BricolageGrotesque_700Bold',
  },
  viewAllButton: {
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#4B0082',
    borderRadius: 8,
    marginBottom: 10,
  },
  viewAllText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'BricolageGrotesque_700Bold',
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'BricolageGrotesque_500Bold',
  },
  subCategoryItem: {
    paddingLeft: 30,
    paddingVertical: 5,
  },
  subCategoryText: {
    fontSize: 14,
    color: '#555',
  },
});

export default HomeScreen;
