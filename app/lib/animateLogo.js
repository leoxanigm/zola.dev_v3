export const animateLogo = () => {
  const s = Snap('#logo');

  console.log('logo animation started!');

  if (!s) {
    console.log('logo not found!');
    return;
  }

  // Triangles
  const bigBlack = s.polyline(0, 0, 300, 0, 0, 300).attr({
    fill: '#000',
    'fill-opacity': 0
  });

  const smallWhite = s.polyline(75, 75, 125, 75, 75, 125).attr({
    fill: '#fff',
    'fill-opacity': 0
  });

  const bigWhite = s.polyline(0, 300, 300, 0, 300, 300).attr({
    fill: '#fff',
    'fill-opacity': 0
  });

  const smallBlack = s.polyline(175, 225, 225, 175, 225, 225).attr({
    fill: '#000',
    'fill-opacity': 0
  });

  // Lines

  const topRight = s.polyline(0, 0, 0, 0).attr({
    stroke: '#fff'
  });

  const bottomLeft = s.polyline(0, 300, 300, 300).attr({
    stroke: '#fff'
  });

  const leftDown = s.polyline(75, 0, 75, 0).attr({
    stroke: '#fff'
  });

  const leftUp = s.polyline(125, 300, 125, 300).attr({
    stroke: '#fff'
  });

  const rightDown = s.polyline(175, 0, 175, 0).attr({
    stroke: '#fff'
  });

  const rightUp = s.polyline(225, 300, 225, 300).attr({
    stroke: '#fff'
  });

  // Animate strokes down
  leftDown.animate(
    {
      points: '75, 0, 75, 300'
    },
    300,
    () => {
      leftDown.animate(
        {
          points: '75, 300, 75, 300'
        },
        100
      );
    }
  );

  rightDown.animate(
    {
      points: '175, 0, 175, 300'
    },
    300,
    () => {
      rightDown.animate(
        {
          points: '175, 300, 175, 300'
        },
        100
      );
    }
  );

  // Animate strokes up
  leftUp.animate(
    {
      points: '125, 0, 125, 300'
    },
    300,
    () => {
      leftUp.animate(
        {
          points: '125, 0, 125, 0'
        },
        100
      );
    }
  );

  rightUp.animate(
    {
      points: '225, 0, 225, 300'
    },
    300,
    () => {
      rightUp.animate(
        {
          points: '225, 0, 225, 0'
        },
        100
      );
    }
  );

  setTimeout(() => {
    // Animate strokes right
    topRight.animate(
      {
        points: '0, 0, 300, 0'
      },
      300,
      () => {
        topRight.animate(
          {
            points: '300, 0, 300, 0'
          },
          200
        );
      }
    );

    bottomLeft.animate(
      {
        points: '0, 300, 300, 300'
      },
      300,
      () => {
        bottomLeft.animate(
          {
            points: '0, 300, 0, 300'
          },
          200
        );
      }
    );
  }, 200);

  // Animate triangles
  bigBlack.animate(
    {
      'fill-opacity': 1
    },
    1300
  );

  smallWhite.animate(
    {
      'fill-opacity': 1
    },
    1300
  );

  bigWhite.animate(
    {
      'fill-opacity': 1
    },
    1300
  );

  smallBlack.animate(
    {
      'fill-opacity': 1
    },
    1300
  );

  
};
