import numpy as np
import tensorflow as tf
import tensorflowjs as tfjs
import cv2
mnist=tf.keras.datasets.mnist
(x_train,y_train),(x_test,y_test)=mnist.load_data()

count=0

for img in x_train:
    x_train[count]=np.invert(img)
    count=count+1

cv2.imshow("test",x_train[25])
cv2.waitKey(0)
# x_train=tf.keras.utils.normalize(x_train,1)
# x_test=tf.keras.utils.normalize(x_test,1)


# model=tf.keras.models.Sequential()

# model.add(tf.keras.layers.Flatten(input_shape=(28,28)))
# model.add(tf.keras.layers.Dense(units=128,activation="relu"))
# model.add(tf.keras.layers.Dense(units=128,activation="relu"))
# model.add(tf.keras.layers.Dense(units=10,activation="softmax"))
# model.compile(optimizer="adam",loss="sparse_categorical_crossentropy",metrics=['accuracy'])
# # fit the model
# model.fit(x_train, y_train,epochs=70)
# # save the model
# tfjs.converters.save_keras_model(model, "model")