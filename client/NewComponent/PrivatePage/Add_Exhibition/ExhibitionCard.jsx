import React from "react";
import { useNavigate } from "react-router-dom";

export const ExhibitionCard = ({nft,exhibitionData}) => {
      const navigate = useNavigate();

      const handleMintIntoExhibition = () => {
        navigate('/mint', {
            state: { exhibitionId: nft.exhibitionId}
        });
      }

      return (
        <div>
            <h3>{exhibition.name}</h3>
            <p>{exhibitionData.description}</p>
            <button onClick={handleMintIntoExhibition}>Mint NFt in this Exhibition</button>
        </div>
      )
}