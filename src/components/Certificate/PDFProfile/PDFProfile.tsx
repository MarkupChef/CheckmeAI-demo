import { PDFCardStyles } from '@components/Certificate/PDFStyles';
import { Image, StyleSheet, Text, View } from '@react-pdf/renderer';
import { FC } from 'react';

const PDFStyles = StyleSheet.create({
  card: PDFCardStyles,

  profileInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '16pt',
    fontSize: '24pt',
    paddingTop: '2.5pt',
  },

  profileName: {
    fontFamily: 'Montserrat',
    fontWeight: 600,
    fontSize: '22pt',
    color: '#222831',
  },

  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
  },

  placeholder: {
    width: '50pt',
    height: '50pt',
    borderRadius: '50%',
    border: '2pt solid #222827',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b9b9b9',
    color: '#fff',
    overflow: 'hidden',
  },

  placeholderText: {
    fontFamily: 'Montserrat',
  },
});

const PDFProfile: FC<{ userImg?: string; userName: string }> = ({ userName, userImg }) => {
  const renderUserImg = () => {
    if (userImg) {
      return (
        <View style={PDFStyles.placeholder}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image src={userImg} style={PDFStyles.avatar} />
        </View>
      );
    }

    const firstLetter = userName.split(' ')[0].charAt(0);

    return (
      <View style={PDFStyles.placeholder}>
        <Text style={PDFStyles.placeholderText}>{firstLetter}</Text>
      </View>
    );
  };

  return (
    <View style={{ ...PDFStyles.card, height: '85pt' }}>
      <View style={PDFStyles.profileInfo}>
        {renderUserImg()}
        <View>
          <Text style={PDFStyles.profileName}>{userName}</Text>
        </View>
      </View>
    </View>
  );
};

export default PDFProfile;
