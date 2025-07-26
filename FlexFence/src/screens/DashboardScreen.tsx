// src/screens/DashboardScreen.tsx
import React from 'react';
import { View, Text, Image } from 'react-native';
import ScreenContainer from '../components/screencontainer';
import { useAppColors } from '../hooks/useAppColors';
import TimeTracker from '../components/TimeTracker';
import FenceMap from '../components/FenceMap';
import LinkedOrganizations from '../components/LinkedOrganization';

const DashboardScreen: React.FC = () => {
    const colors = useAppColors();

  return (
<ScreenContainer style={{ padding:15}}>
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginBottom:20   
    }}
  >
    <View style={{flexDirection:'row', alignItems:'center', gap:6}}>
        <Image 
         source={require('../assets/cee.png')}
         style={{width:40, height:40}}
        />
        <View>
            <Text style={{color:colors.primary, fontFamily:'DMSans-Bold', fontSize:18}}>Central Park</Text>
            <Text style={{fontSize:8, color:colors.reggy}}>Owerri, Garden Park</Text>
        </View>
    </View>
    <View>        
        <Image 
         source={require('../assets/profile.png')}
         style={{width:40, height:40}}
        /></View>
  </View>
  <TimeTracker />
  <FenceMap />
<LinkedOrganizations/>
</ScreenContainer>

  );
};

export default DashboardScreen;
