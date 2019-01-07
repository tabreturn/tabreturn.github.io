import pandas as pd
import seaborn as sns
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import axes3d

# blender csv code
'''
import bpy
outputFile = 'PATH_TO_OUTPUT_DIRECTORY/mesh.csv'
verts = [bpy.context.object.matrix_world * v.co for v in bpy.context.object.data.vertices]
csvlines = [','.join([ str(v) for v in co ]) + '\n' for co in verts]
f = open(outputFile, 'w')
f.write('coffee,date,score')
f.writelines(csvlines)
f.close()
'''

# data
df = pd.read_csv('t-piece.csv')
df['coffee'] *=- 1
df['coffee'] = np.interp(df['coffee'], (df['coffee'].min(), df['coffee'].max()), (10, 90))
df['date'] = np.interp(df['date'], (df['date'].min(), df['date'].max()), (1, 5.25))
df['score'] = np.interp(df['score'], (df['score'].min(), df['score'].max()), (25, 188))

# 3d
fig = plt.figure()
ax = fig.add_subplot(111, projection='3d', proj_type = 'ortho')
ax.scatter(xs=df['coffee'], ys=df['date'], zs=df['score'])
ax.set_xlabel('coffee')
ax.set_xlim([0,100])
ax.set_ylabel('date')
ax.set_ylim([0,6])
ax.set_zlabel('score')
ax.set_zlim([0,200])

# splom
sns.set(style="ticks")
s = sns.pairplot(data=df)
s.axes[0,0].set_xlim((0,100))
s.axes[0,0].set_ylim((0,100))
s.axes[0,1].set_xlim((0,6))
s.axes[1,0].set_ylim((0,6))
s.axes[0,2].set_xlim((0,200))
s.axes[2,0].set_ylim((0,200))

# display
plt.show()
