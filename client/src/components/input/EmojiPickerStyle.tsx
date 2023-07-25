import React from 'react';
import Picker, { EmojiClickData } from "emoji-picker-react"

interface EmojiPickerStyleProps {
  onEmojiClick: (emojiObject: EmojiClickData) => void;
  pickerStyle: React.CSSProperties;
}

const EmojiPickerStyle: React.FC<EmojiPickerStyleProps> = ({ onEmojiClick, pickerStyle }) => {
  return (
    <div style={pickerStyle}>
      <Picker onEmojiClick={onEmojiClick} />
    </div>
  );
};

export default EmojiPickerStyle;
